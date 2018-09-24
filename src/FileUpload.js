import React, { Component } from 'react';


class FileUpload extends Component {
  constructor () {
    super();
    this.state = {
      uploadValue: 0
    };
  }

  render () {
    return (
      <div>
         <textarea value={this.state.posts} class="post-area" name="publicacion" id="postContent"></textarea>
            <br/>
             <button  id="publishApost" onClick={this.posts} value="Publicar">Publicar 
              </button>
              <br/>
        <progress value={this.state.uploadValue} max='100'>
          {this.state.uploadValue} %
        </progress>
        <br/>
        <input type="file" onChange={this.props.onUpload} />
        <br/>
        <img width="50" height="20" src={this.state.picture} alt=""/>
      </div>
    )
  }
}

export default FileUpload;
