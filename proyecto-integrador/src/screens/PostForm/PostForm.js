import { Component } from "react"
import { auth } from "../../firebase/config"

class PostForm extends Component {
    constructor(){
        super()
        this.state = {post: '', showCamera: true}
    }

    postear(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            post:,
            foto:,
            likes:[],
        })
    }
}