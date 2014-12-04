var React  = require("react");

var Avatar = React.createClass({
    getImageSrc: function () {
        return this.props.user.pictureUrl;
    },
    render: function () {
        var customClass = this.props.className ? this.props.className + " " : "";
        return (
            <div className={customClass + "app-avatar"}>
                <img src={this.getImageSrc()} />
            </div>
        );
    }
});

module.exports = Avatar;
