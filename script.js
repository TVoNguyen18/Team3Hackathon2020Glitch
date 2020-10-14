$(document).ready(function() {
  /* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
  let id = 0
  class Forum {
    constructor() {
      this.posts = [];
    }
    addPosts(post) {
      this.posts.unshift(post);
    }
     
    show() {
      $("#forumposts").empty();
      id = 0
      for (let post in this.posts) {
        let arraylength = this.posts[post]["comments"].length;
        let content = `
        <div class="postCards">
           <div class="card w-100">
            <div class="card-body">
              <h5 class="card-title">${
                this.posts[post]["title"]
              }<small class="form-text text-muted inline" > • Posted by ${
          this.posts[post]["user"]
        } ${this.posts[post]["time"]}</small></h5>
              <p class="card-text">${this.posts[post]["postText"]}</p>
<div id="commentsection"></div>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop2">
              comment
            </button>


            <div class="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Comment on this post</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                          <div class="form-group">
                            <label for="user">Username</label>
                            <input type="email" class="form-control" id="userComment" />
                          </div>
                          <div class="form-group">
                            <label>Comment</label>
                            <textarea
                              class="form-control"
                              aria-label="With textarea"
                              id="comment"
                            ></textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary commentSubmit" id="${id}" onclick="commenting()">Comment</button>
                  </div>
                </div>
              </div>
            </div>
                        </div>
                       </div>
                    </div>

          
                    `;
      
        $("#forumposts").append(content);
        
        $(".commentSubmit").click(function() {
    let date = new Date();
    let time = date.getMonth() + "-" + date.getDate();
    let commentId= $(".commentSubmit").attr("id")
    console.log("commentID:"+ commentId + ", comment:" + $("#comment").val())
    forum.posts[commentId].addComments(forum.posts[commentId].createComment(
        time,
        $("#userComment").val(),
        $("#comment").val()),
         )
       console.log(forum.posts);
  });
        
        if(arraylength != 0){
          for(let comment in this.posts[post]["comments"]){
            let content2 = `
      <div class="postCards">
           <div class="card w-100">
            <div class="card-body">
              <h5 class="card-title">${
                this.posts[post]["title"]
              }<small class="form-text text-muted inline" > • Posted by ${
          this.posts[post]["user"]
        } ${this.posts[post]["time"]}</small></h5>
              <p class="card-text">${this.posts[post]["postText"]}</p>
        </div>
          `        
            $("commentsection").append(content2);
          }
        }
        console.log(id)
        id++;
      }
    }
  
    
    createPosts(time, user, postText, title) {
      return new Post(time, user, postText, title);
    }
  }

  class Post {
    constructor(time, user, postText, title) {
      this.title = title;
      this.time = time;
      this.user = user;
      this.comments = [];
      this.postText = postText;
    }
    addComments(post) {
      this.comments.push(post);
    }
    createComment(time,user,postText){
      return new Post(time, user, postText,"none");
      
    }
    
  }
  

  let forum = new Forum();
  $("#submit").click(function() {
    let date = new Date();
    let time = date.getMonth() + "-" + date.getDate();
    forum.addPosts(
      forum.createPosts(
        time,
        $("#user").val(),
        $("#text").val(),
        $("#title").val()
      )
    );
    console.log(forum.posts);
    forum.show();

  });
  $(".commentSubmit").click(function() {
    let date = new Date();
    let time = date.getMonth() + "-" + date.getDate();
    let commentId= $(".commentSubmit").attr("id")
    console.log("commentID:"+ commentId + ", comment:" + $("#comment").val())
    forum.posts[commentId].addComments(forum.posts[commentId].createComment(
        time,
        $("#userComment").val(),
        $("#comment").val()),
         )
 
       console.log(forum.posts);
  });
   function commenting(){
     let date = new Date();
    let time = date.getMonth() + "-" + date.getDate();
    let commentId= $(".commentSubmit").attr("id")
    console.log("commentID:"+ commentId + ", comment:" + $("#comment").val())
    forum.posts[commentId].addComments(forum.posts[commentId].createComment(
        time,
        $("#userComment").val(),
        $("#comment").val()),
         )
 
       console.log(forum.posts);
   }
  forum.addPosts(
      forum.createPosts(
        "8-20",
       "Ms.Yoga",
        "Yoga Session happening today. Join us @5:30 via Zoom.",
        "Yoga Session"
      )
    );
  
  forum.addPosts(
      forum.createPosts(
        "8-20",
       "workoutTrainer23",
        "workoutTrainer23 Here. Just wanted to let everyone know I'm hosting a virtual workout session on @10:30 today. Let me know if you're interested.",
        "Workout Session"
      )
    );
  
  forum.addPosts(
      forum.createPosts(
        "8-22",
       "Catsarecool38",
        "Man i really like cats. Cats are awesome and dogs are ok, but cats are really cool.",
        "Cats are Cool"
      )
    );
  forum.addPosts(
      forum.createPosts(
        "8-20",
       "dave@fpc",
        "Hello everyone. My organization Financial People's committee (FPC) is hosting a finance class for people interested in created better budgets. Link in the FPC website. ",
        "Finance Class"
      )
    );
  
  forum.show();
  
  
  
  // Thanhthanh's image hover thing
  $('#image-map area').hover(
    function () { 
        var coords = $(this).attr('coords').split(','),
            width = $('.image-map-container').width(),
            height = $('.image-map-container').height();
        $('.image-map-container .map-selector').addClass('hover').css({
            'left': coords[0]+'px',
            'top': coords[1] + 'px',
            'right': width - coords[2],
            'bottom': height - coords[3]
        })
    },
    function () { 
        $('.image-map-container .map-selector').removeClass('hover').attr('style','');
    }
  )
  // ignore
  
  
});





//   class Entry {
//     constructor() {
//       this.notes = [];
//     }
//     addNotes(note) {
//       this.notes.push(note);
//     }

//     show() {
//       $("#entryposts").empty();
//       for (let note in this.notes) {
//         let noteContent = `
//         <div class="noteCards">
//            <div class="note w-100">
//             <div class="note-body">
//               <h5 class="note-title">${
//                 this.notes[note]["title"]
//               }<small class="form-text text-muted inline" > • Note was written by${
//           this.notes[note]["user"]
//         } ${this.notes[note]["time"]}</small></h5>
//               <p class="card-text">${this.notes[note]["noteText"]}</p>







// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
//   comment
// </button>


// <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="staticBackdropLabel">Comment on this note</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         <form>
//               <div class="form-group">
//                 <label for="user">Username</label>
//                 <input type="email" class="form-control" id="user" />
//               </div>
//               <div class="form-group">
//                 <label>Comment</label>
//                 <textarea
//                   class="form-control"
//                   aria-label="With textarea"
//                   id="text"
//                 ></textarea>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
//         <button type="button" class="btn btn-primary">Comment</button>
//       </div>
//     </div>
//   </div>
// </div>
//             </div>
//            </div>
//         </div>
//         `;

//         $("#entryposts").append(noteContent);
//       }
//     }
//     createNote(time, user, noteText, title) {
//       return new Note(time, user, noteText, title);
//     }
//   }

//   class Note {
//     constructor(time, user, noteText, title) {
//       this.title = title;
//       this.time = time;
//       this.user = user;
//       this.Comments = [];
//       this.noteText = noteText;
//     }
//     addComments(time, user, noteText) {
//       this.Comments.push(new Note(time, user, noteText, "none"));
//     }
//   }

//   Entry = new Entry();
//   $("#submit").click(function() {
//     let date = new Date();
//     let time = date.getMonth() + "-" + date.getDate();
//     Entry.addNotes(
//       Entry.createNotes(
//         time,
//         $("#user").val(),
//         $("#text").val(),
//         $("#title").val()
//       )
//     );
//     console.log(Entry.notes);
//     Entry.show();
//     $("p");
//   });
//    $("#comment").click(function() {
//     let date = new Date();
//     let time = date.getMonth() + "-" + date.getDate();

//     console.log(Entry.notes);

//     $("p");
//   });
  