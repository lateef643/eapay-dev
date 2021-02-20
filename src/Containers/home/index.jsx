import { Component } from 'react'
import Input from '../../Atoms/Input';

class Home extends Component {
    state = {}

    render() {
        return (
            <>
            <h2>hello</h2>
            <Input name='label' placeholder='Label' type='text' />
            </>
        )
    }
}

export default Home;