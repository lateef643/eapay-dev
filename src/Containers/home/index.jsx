import { Component } from 'react'
import { ShoppingCartOutline, CreditCardOutline, Menu } from 'heroicons-react';

import HomeView from '../../Presentations/home';

class Home extends Component {
    state = {
        data: [
            {
                icon: <ShoppingCartOutline size={25} />,
                name: 'Product'
            },
            {
                icon: <CreditCardOutline size={25} />,
                name: 'Credit score'
            },
            {
                icon: <Menu size={25} />,
                name: 'Transactions'
            }
        ]
    }

    render() {
        return (
           <HomeView bottomLinks={this.state.data} />
        )
    }
}

export default Home;