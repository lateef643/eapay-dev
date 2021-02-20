import { Component } from 'react'
import BottomNavigation from '../../Atoms/bottomNavigation';
import Button from '../../Atoms/button'
import Input from '../../Atoms/Input';
import { CameraIcon, CartIcon, CreditCardIcon } from '../../Atoms/icons';

class Home extends Component {
    state = {
        data: [
            {
                icon: <CreditCardIcon size={25} padding={0} />,
                name: 'Card'
            },
            {
                icon: <CartIcon padding={0} size={25} />,
                name: 'Cart'
            },
            {
                icon: <CameraIcon size={25} padding={0} />,
                name: 'Camera'
            }
        ]
    }

    render() {
        return (
            <div style={{ height: '100vh' }}>
            <BottomNavigation data={this.state.data} />
            <Input label='Email' />
            <Button label="Submit" />
            </div>
        )
    }
}

export default Home;