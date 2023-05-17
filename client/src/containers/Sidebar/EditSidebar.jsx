import React, { useState, useEffect } from 'react';
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import AddSnippet from '../../components/AddSnippet/AddSnippet.jsx';
import SnippetsRadioList from './SnippetsRadioList/SnippetsRadioList.jsx';
import arrow from '../../assets/arrow.png';
import img from '../../assets/star nose mole.jpeg';

const Sidebar = () => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(true);

  // getSnippet func
  const getSnippet = () => {
    setLoading(true);
    fetch('/snippets')
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);

        // moved setSnippets to outside of for loop so we arent re-rendering each time a snippet is added to state
        const newSnippetArray = [];
        for (const snippet of res.snippets) newSnippetArray.push(snippet);

        setSnippets(newSnippetArray);
        setLoading(false);
      })
      .catch((error) => console.log('Get request failed', error));
  };

  const renderTabs = () => {
    const tabs = [];

    for (let i = 0; i < snippets.length; i++) {
      tabs.push(
        <li key={snippet[i]._id}>
          <Link to={`/snippet/${snippet[i]._id}`}>{snippets[i].title}</Link>
        </li>
      );
    }

    return tabs;
  };

  useEffect(() => getSnippet(), []);

  const toggleSidebar = () => {
    setCollapse(() => !collapse);
  };

  return (
    <span>
      <div id='sidebar'>
        <h1>Code Snippets</h1>
        <div className='searchBar'>
          <form id='search-form' role='search'>
            <input id='s' type='search' name='s' placeholder='Search' />
          </form>
        </div>
        <div>
          <button
            className='button'
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <img src={img} alt='img' className='img' />
          </button>
        </div>
        {openModal && <AddSnippet closeModal={setOpenModal} />}

        {snippets && (
          <SnippetDisplay
            selectedSnippet={selectedSnippet}
            getSnippet={getSnippet}
          />
        )}
      </div>
    </span>
  );
};

export default Sidebar;
