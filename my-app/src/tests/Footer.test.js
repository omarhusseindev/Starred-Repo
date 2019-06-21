import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Footer from '../components/Footer';
import { GET_VIEWER } from '../components/Footer';


const mocks = [
    {
        request: {
            query: GET_VIEWER,
        },
        result: {
            data: {
                dog: { id: '1', login: 'omarhusseindev', avatarUrl: 'https://avatars3.githubusercontent.com/u/51884181?v=4' },
            },
        },
    },
];

describe('Footer', () => {

    it('renders without crashing', () => {
        shallow(<Footer />);
    });

});
