
import React from 'react';

import styled from 'styled-components';

import DisplayImage from './DisplayImage';
import Card from './Card';
import Topics from './Topics';

import starSvg from '../assets/star.svg';
import starSvgFilled from '../assets/star-filled.svg';

const AvatarDiv = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: 10,
    alignItems: 'center',
    fontSize: 14,
});

const RepositoryCard = ({ data }) => {
    const hasStarred = data.viewerHasStarred;

    return (
        <Card>
            <a className="star-wrapper">
                <img src={hasStarred ? starSvgFilled : starSvg} alt="star" />
            </a>
            <AvatarDiv>
                <DisplayImage src={data.owner.avatarUrl} width={30} height={30} />
                <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {data.nameWithOwner}
                </a>
            </AvatarDiv>
            {data.repositoryTopics.edges.length ? (
                <div>
                    {data.repositoryTopics.edges.map(({ node }) => (
                        <Topics key={node.topic.id}>{node.topic.name}</Topics>
                    ))}
                </div>
            ) : null}
        </Card>
    );
};

export default RepositoryCard;
