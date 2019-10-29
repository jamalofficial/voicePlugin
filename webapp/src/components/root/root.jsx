import {changeOpacity} from 'mattermost-redux/utils/theme_utils';

import './root.css';

const React = window.React;
const PropTypes = window.PropTypes;

function pad2(n) {
    const val = n | 0;
    return val < 10 ? `0${val}` : `${Math.min(val, 99)}`;
}

function pad2nozero(n) {
    const val = n | 0;
    return val < 10 ? `${val}` : `${Math.min(val, 99)}`;
}

export default class Root extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        duration: PropTypes.number.isRequired,
        theme: PropTypes.object.isRequired,
        startRecord: PropTypes.func.isRequired,
        send: PropTypes.func.isRequired,
        cancel: PropTypes.func.isRequired,
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getDuration() {
        const msecs = this.props.duration;
        const secs = Math.round(msecs / 1000);
        return pad2nozero(secs / 60) + ':' + pad2(secs % 60);
    }

    render() {
        if (!this.props.visible) {
            return null;
        }
        const style = getStyle(this.props.theme);
        return (
            <div style={style.root}>
                <div style={style.rec}>
                    <p>
                        <small>{'Press and Hold to Record, Release to Send.'}</small>
                    </p>
                    <span className='voice-recording-icon'>
                        <i
                            className='icon fa fa-microphone'
                            style={style.icon}
                        />
                    </span>
                    <p style={style.duration}>{this.getDuration()}</p>
                    <button
                        className='voice-recording-button btn-sm'
                        onMouseDown={this.props.startRecord}
                        onMouseUp={this.props.send}
                        style={style.button}
                    >
                        <i className='fa fa-commenting' style={style.buttonIcon}/>
                        {'Record and Send'}
                    </button>
                    <button
                        className='voice-recording-button btn-sm'
                        onClick={this.props.cancel}
                        style={style.cancelBtn}
                    >
                        <i className='fa fa-times' style={style.buttonIcon}/>
                        <strong>{'Cancel'}</strong>
                    </button>
                </div>
            </div>
        );
    }
}

const getStyle = (theme) => ({
    root: {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    rec: {
        padding: '0.5em',
        backgroundColor: theme.centerChannelBg,
        color: theme.centerChannelColor,
        border: `1px solid ${changeOpacity(theme.centerChannelColor, 0.1)}`,
    },
    button: {
        background: '#145dbf',
        borderRadius: '5px',
        color: '#ffffff',
        padding: '0.5em',
        border: 'none',
        width: '100%',
    },
    icon: {
        color: 'red',
        padding: '0.5em',
        fontSize: '120px',
        width: '100%',
        textAlign: 'center',
    },
    duration: {
        padding: '0.5em',
        textAlign: 'center',
        fontSize: '20px',
    },
    cancelBtn: {
        marginTop: '5px',
        background: '#d9534f',
        borderRadius: '5px',
        color: '#ffffff',
        padding: '0.5em',
        border: 'none',
        width: '100%',
    },
    buttonIcon: {
        color: '#ffffff',
        padding: '5px',
    },
});
