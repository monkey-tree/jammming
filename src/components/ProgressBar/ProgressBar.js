import React from 'react';
import ReactDOM from 'react-dom';
import { Progress } from 'antd';

const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');



class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.changeProgress = this.changeProgress.bind(this);
        this.state = {
            percent: 0,
        }
    }

    
    changeProgress() {
        let percent = this.state.percent;
        percent += 20;
        if (percent < 95) {
            this.setState({
                percent: percent
            })
        } else if (!this.props.playlistSaveProgress) {
            return;
        } else {
            this.setState({
                percent: 100
            })
        }

    }

    componentDidMount() {
        this.timerID = setInterval(() => this.changeProgress(), 100);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.percent === 100) {
            this.el = document.getElementById(this.props.id);
            ReactDOM.unmountComponentAtNode(this.el);
            modalRoot.removeChild(this.el);
        }   
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h2>{this.props.playlistName} is saving...</h2>
                <Progress percent={this.state.percent} status="active"/>
            </div>
            
        );
    }
}




export default ProgressBar;
