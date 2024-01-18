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


module.exports.removeFromLikedMovies = async(req,res) => {
      try {
            const { email, movieId } = req.body
            const user = await User.findOne({ email })
            if( user ){
                  const { likedMovies } = user
                  const movieIndex = likedMovies.findIndex( ({ id }) => (id === movieId) )

                  if( !movieIndex ) res.status(400).send({ msg : 'Movie not found' })

                  likedMovies.splice( movieIndex, 1 ) // Deleting that movie/show

                  await User.findByIdAndUpdate(
                        user._id,
                        {
                              likedMovies
                        },
                        { new: true } // because we want this as new document
                  )
                  return res.json({ msg: "Movie successfully removed.", movies: likedMovies });
            }  else return res.json({ msg: "User with given email not found." });
      } catch ( err ) {
            return res.json({ msg : "Error deleting movies" })
      }
}