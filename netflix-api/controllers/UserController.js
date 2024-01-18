const User = require('../models/UserModel')

module.exports.addToLikedMovies = async(req,res) => {
      try {
            const { email, data } = req.body
            const user = await User.findOne({ email })
            if( user ){
                  const { likedMovies } = user
                  const movieAlreadyLiked = likedMovies.find( ({ id }) => (id === data.id))
                  
                  if( !movieAlreadyLiked ){
                        await User.findByIdAndUpdate(
                              user._id,
                              {
                                    likedMovies:[...user.likedMovies, data]
                              },
                              { new: true } // because we want this as new document
                        )
                  } else return res.json({ msg : 'Movie already added to the liked list'})
            } else await User.create({ email, likedMovies:[data] })

            return res.json({ msg: 'Movie added to list successfully'})
      } catch( err ) {
            return res.json({ msg : 'Error adding Movie'})
      }
}


module.exports.getLikedMovies = async(req,res) => {
      try {
            const { email, data } = req.params
            const user = await User.findOne({ email })
            if( user ){
                  res.json({ msg : "success" , movies: user.likedMovies })
            } else return res.json({ msg : "User with given email not found" })
      } catch ( err ) {
            return res.json({ msg : "Error fetching movies" })
      }
}