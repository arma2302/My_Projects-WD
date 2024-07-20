{
  /* profile card */
}
{
  profilebtn && (
    <Box className="profile-wrap">
      {userDetails?.profilepic ? <img src={userDetails?.profilepic} className="profile-img "></img> : <img src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png" className="profile-img "></img>}
      {/* input */}
      <div className="inp-wrap">
        <input type="file" onChange={(e) => setProfileUrl(e.target.files[0])} className="file" />
      </div>
      <div>
        <Button color="secondary" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleSubmit}>
          Upload file
        </Button>
      </div>
    </Box>
  );
}

{
  post ? (
    <div className="posts-wrap">
      {post.map((singlePost, index) => {
        return (
          <div class="card-post" key={index}>
            <div class="card-header">
              <img src={singlePost.image} alt="" />
            </div>
            <div class="card-body">
              <h4>{singlePost.title}</h4>
              <p>{singlePost.description}</p>
              <div class="user">
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <img src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png" alt="" />

                  <div class="user-info">
                    <h5>{postUsers[singlePost.userid]}</h5>
                    <small>2h ago</small>
                  </div>
                </Box>
                <div>
                  <div className="like">
                    <IconButton onClick={() => handleLike(singlePost.id)}>
                      <FavoriteBorderIcon sx={{ color: "white" }} />
                    </IconButton>

                    <IconButton>
                      <AddCommentIcon sx={{ color: "white" }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <LinearProgress color="secondary" />
  );
}
