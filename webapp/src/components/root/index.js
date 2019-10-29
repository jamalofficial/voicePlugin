import {cancelRecording, sendRecording, recordInstantVoice} from '../../actions.js';
import {isRecordingModalVisible, recordingDuration} from '../../selectors.js';

import Root from './root';

const connect = window.ReactRedux.connect;
const bindActionCreators = window.Redux.bindActionCreators;

const mapStateToProps = (state) => ({
    visible: isRecordingModalVisible(state),
    duration: recordingDuration(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    cancel: cancelRecording,
    send: sendRecording,
    startRecord: recordInstantVoice,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Root);
