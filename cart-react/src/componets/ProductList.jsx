import React, { useState } from "react";
import { data } from "../app/data";

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };

    const openModal = (product) => {
        setCurrentBook(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentBook(null);
    };

    return (
        <div className='container-items'>
            {data.map(product => (
                <div className='item' key={product.id}>
                    <figure>
                        <img src={product.urlImage} alt={product.title} onClick={() => openModal(product)} />
                    </figure>
                    <div className='info-product'>
                        <h2>{product.title}</h2>
                        <p className='price'>${product.price}</p>
                        <button onClick={() => onAddProduct(product)}>Añadir al carrito</button>
                    </div>
                </div>
            ))}
            {modalOpen && currentBook && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <h2>{currentBook.title}</h2>
                        <img src={currentBook.urlImage} alt={currentBook.title} />
                        <p>{currentBook.summary}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
