import { Link } from "react-router-dom";
import './Post.css'
export default function Post({ _id, name, file }) {
    return (
        <div className="animal">
            <Link to={`/adoption/${_id}`}>
                <p className="overlay">{name}</p>
                <img className='animal-pic' src={file} alt="snimka" />
            </Link>
        </div>
    )
}