import React, { useState } from 'react';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import NewsList from '../../pages/Tag/Tag';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSelectTag = (categoryId, tagId) => {
    setSelectedCategory(categoryId);
    setSelectedTag(tagId);
  };

  return (
    <div>
      <CategoryMenu onSelectTag={handleSelectTag} />
      {selectedCategory && selectedTag && (
        <NewsList categoryId={selectedCategory} tagId={selectedTag} />
      )}
    </div>
  );
};

export default App;
