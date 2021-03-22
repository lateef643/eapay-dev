import React from 'react';
import Header from '../../Atoms/header'
import Card from './card';
import { ArrowLeft, ShoppingCart, } from "heroicons-react";


const Index = () => {
    return(
        <div>
            <Header title='Store' iconRight={<ShoppingCart />} iconLeft={<ArrowLeft/>}  />
            <Card />
        </div>
    )
}


export default Index;