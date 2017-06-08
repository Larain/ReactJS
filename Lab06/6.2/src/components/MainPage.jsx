import React from 'react';
import { Link } from 'react-router';

import MessagePreview from './MessagePreview.jsx';

import articles1 from '../articles.json';

import './InboxPage.less';

const MainPage = React.createClass({
    render() {
        return (
            <div >
                <h2>Welcome to the main page of our online book store. We sell all kind of books so you can definetly find one for yourself!</h2>
            </div>
        );
    }
});

export default MainPage;
