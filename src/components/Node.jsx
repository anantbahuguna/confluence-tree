import { useState } from "react";
import { FaCircle, FaAngleRight, FaAngleDown } from "react-icons/fa";

const Nodes = ({ nodes }) => {
  return (
    <ul className="nodes">
      {nodes.map((node, index) => (
        <Node key={node.id} {...node} />
      ))}
    </ul>
  );
};

const Node = ({ id, label, link, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isParentNode = Boolean(children && children.length);
  const handleClick = () => {
    if (!isParentNode) {
      return;
    }
    setIsOpen((prev) => !prev);
  };
  return (
    <li>
      <div className="node">
        <div className="label">
          <Icon
            isParentNode={isParentNode}
            isOpen={isOpen}
            onClick={handleClick}
          />
          <a href={link}>{label}</a>
        </div>

        {isParentNode && isOpen ? (
          <div className="children">
            <Nodes nodes={children} />
          </div>
        ) : null}
      </div>
    </li>
  );
};

const Icon = ({ isParentNode, isOpen, onClick }) => {
  if (isParentNode) {
    return (
      <button className={`icon ${isOpen ? "is-open" : ""}`} onClick={onClick}>
        <FaAngleRight style={{ padding: 0, margin: 0 }} />
      </button>
    );
  }

  return (
    <span>
      <FaCircle size="6px" />{" "}
    </span>
  );
};

export default Nodes;
