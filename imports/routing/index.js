import route from './router.js'
import Home from '/imports/ui/Home.jsx';
import Register from '/imports/ui/pages/user/Register.jsx';
import Login from '/imports/ui/pages/user/Login.jsx';
import PostCreate from '/imports/ui/pages/post/PostCreate.jsx';
import PostList from '/imports/ui/pages/post/PostList.jsx';
import PostEdit from '/imports/ui/pages/post/PostEdit.jsx';
import PostView from '/imports/ui/pages/post/PostView.jsx';
import CommentView from '/imports/ui/pages/post/CommentView.jsx';

route('/', Home);
route('/register', Register);
route('/login', Login);
route('/post/create', PostCreate);
route('/post/list', PostList);
route('/post/:postId/edit', PostEdit);
route('/post/:postId/view', PostView);
route('/comment/view', CommentView);