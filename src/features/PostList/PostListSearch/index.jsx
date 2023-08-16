import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

PostListSearch.propTypes = {
  onSubmit: PropTypes.func,
};

PostListSearch.defaultProps = {
  onSubmit: null,
};

function PostListSearch(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typeTimeOutRef = useRef(null);

  function handleFilterSearch(e) {
    const value = e.target.value;
    setSearchTerm(value);
    if (!onSubmit) return;

    if (typeTimeOutRef.current) {
      clearTimeout(typeTimeOutRef.current);
    }
    typeTimeOutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      onSubmit(formValue);
    }, 300);
  }

  return (
    <form>
      <input type="text" value={searchTerm} onChange={handleFilterSearch} />
    </form>
  );
}

export default PostListSearch;
