import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import * as productService from '../services/productService'
import * as postService from '../services/postService'
import * as articleService from '../services/articleService'
import * as adoptionContactService from '../services/adoptionContactService'

import ProductsContext from '../context/ProductContext'

export default function useDelete() {
    const { handleDeleteProductState } = useContext(ProductsContext)
    const navigate = useNavigate()

    const onDelete = (id, type, category) => {
        switch (type) {
            case 'post':
                postService.deletePost(id).then(result => {
                    navigate('/adoption')
                }
                ).catch(err => console.log(err))
                break;
            case 'article':
                articleService.deleteArticle(id).then(result => {
                    navigate('/')
                }
                ).catch(err => console.log(err))
                break;
            case 'product':
                productService.deleteProduct(id).then(result => {
                    handleDeleteProductState(category, id)
                    navigate('/')
                }
                ).catch(err => console.log(err))
                break;
            case 'message':
                adoptionContactService.deleteMessage(id).then(result => {
                    navigate('/profile')
                }
                ).catch(err => console.log(err))
                break;
            default:
                break;
        }
    }
    return { onDelete }
}