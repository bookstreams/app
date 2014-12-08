var React  = require("react");

var Icon = require("../icon/icon.jsx");

var ErrorModal = React.createClass({
    closeErrorModal: function () {
        this.props.flux.actions.errorClear();
    },
    render: function () {
        if (!this.props.error) {
            return null;
        }
        return (
            <div className="error-modal" onClick={this.closeErrorModal}>
                <div className="error-icon">
                    <Icon icon="mdi-action-report-problem" />
                </div>
                <div className="error-message">
                    {this.props.error.message}
                </div>
            </div>
        );
    }
});

module.exports = ErrorModal;
