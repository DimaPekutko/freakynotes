import React, { useContext } from 'react';
import { HashTag } from '../../global/types';


import "../../styles/HashTagItem.scss"

function HashTagItem(props: HashTag) {

  return (
    <div className="mx-2 hashtag_item">
        <span>#{props.name}</span>
    </div>
  );
}

export default HashTagItem;
