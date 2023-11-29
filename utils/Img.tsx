import React from 'react';

class Img extends React.Component<any> {
  render() {
    return <img {...this.props} alt={this.props.alt || ''} />;
  }
}

export default Img;
