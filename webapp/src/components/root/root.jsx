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
    RecordingClass = false;
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
    isRecording = (event, recordingStatus) => {
        this.RecordingClass = recordingStatus;
        if (this.RecordingClass) {
            this.props.startRecord.call(event);
        } else {
            this.props.send.call(event);
        }
    }

    render() {
        if (!this.props.visible) {
            return null;
        }
        const style = getStyle(this.props.theme);
        return (
            <div style={style.root}>
                <div style={style.rec}>
                    <i className='fa fa-2x fa-times close-icon' style={style.close_icon} onClick={this.props.cancel}/>
                    <div
                        className={'voice-recording-icon ' + (this.RecordingClass ? 'now-recording' : '')}
                        onMouseDown={(event) => {this.isRecording(event, true)}}
                        onMouseUp={(event) => {this.isRecording(event, false)}}
                    >
                        <i
                            className='icon fa fa-microphone'
                            style={style.icon}
                            title={'Press and Hold to Record, Release to Send.'}
                        />
                        <p style={style.duration}>{this.getDuration()}</p>
                    </div>
                    <p>
                        <small>{'Press and Hold to Record, Release to Send.'}</small>
                    </p>
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
        position: 'relative',
        padding: '3em 1.5em',
        backgroundColor: theme.centerChannelBg,
        color: theme.centerChannelColor,
        border: `1px solid ${changeOpacity(theme.centerChannelColor, 0.1)}`,
        borderRadius: '15px',
    },
    icon: {
        color: 'rgb(20, 93, 191)',
        fontSize: '120px',
        width: '100%',
        textAlign: 'center',
    },
    duration: {
        padding: '0.5em',
        textAlign: 'center',
        fontSize: '20px',
        marginBottom: 'unset',
    },
    close_icon: {
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
});
