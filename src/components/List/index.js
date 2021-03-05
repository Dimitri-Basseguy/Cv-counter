import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import './list.scss';

const List = ({ datasReverse, findLogo }) => {
  /**
   * Liste les liens d'annonces répondus
   * @return jsx
   */
  const mappedLinks = () => {
    if (datasReverse != null) {
      return (
        <Accordion allowMultipleExpanded>
          {datasReverse.map((data) => (
            <AccordionItem>
              <AccordionItemHeading className="links__date">
                <AccordionItemButton>
                  Date : {data.date}
                </AccordionItemButton>
              </AccordionItemHeading>
              {/* <p className="links__date">Date : {data.date}</p> */}
              <AccordionItemPanel>
                <ul>
                  {data.links.map((datalink) => {
                    if (datalink.url != null) {
                      return (
                        <a href={datalink.url} target="_blank" rel="noopener noreferrer">
                          <li className="jobboard">
                            <img className="jobboard__img" src={findLogo(datalink.url)} alt="" />
                            {datalink.title}
                          </li>
                        </a>
                      );
                    }
                    return (
                      <a href={datalink} target="_blank" rel="noopener noreferrer">
                        <li className="jobboard">
                          <img className="jobboard__img" src={findLogo(datalink)} alt="" /> Voir l'annonce
                        </li>
                      </a>
                    );
                  })}
                </ul>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }
    return (
      <ul>
        <li>Pas de liens d'annonces...</li>
      </ul>
    );
  };

  return (
    <div className="links">
      <p>Liens d'annonces répondues</p>
      {mappedLinks()}
    </div>
  );
};

export default List;
