// Improve this React Component
const JSON_URL = 'https://jsonplaceholder.typicode.com/comments';

class CommentList extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: []
    };
  }

  // Use class properties to keep code clean by not having to .bind() the method
  // Abstract the method away from componentDidMount() to make the function more reusable
  // Use axios over jquery ajax due to size/performance and a nicer interface (support promises out of the box)
  getData = () => {
    $.ajax({
        url: JSON_URL,
        dataType: 'json',
        success: data => {
          this.setState({ comments: data });
        }
      });
  }

  componentDidMount() {
    this.getData();
  };

  render() {
    const { comments } = this.state  // destructure variables used in render() for better readability
    // setState is async, therefore need a check to see if state has been properly loaded
    if (comments) {
      return (
        <ul>
          {comments.map(comment => <li>{comment.body}—{comment.name}</li>)}
        </ul>
      );
    }
    return <div>Loading...</div>
  }
}

ReactDOM.render(<CommentList />, document.getElementById('app'));
