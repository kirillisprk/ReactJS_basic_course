import {render, screen} from '@testing-library/react';
import {MessagesList} from "../MessagesList";

describe('messageList test', () => {
    it('renders a message list', () => {
        const messages = [
            {id: 21, author: 'user', text: 'text'},
            {id: 22, author: 'user2', text: 'text2'}
        ];
        render(<MessagesList messageList={messages}/>);

        const msqText = screen.getByText(messages[0].text);
        const msqAuthor = screen.getByText(messages[0].author);
        const msqText2 = screen.getByText(messages[1].text);
        const msqAuthor2 = screen.getByText(messages[1].author);

        expect(msqText).toBeInTheDocument();
        expect(msqAuthor).toBeInTheDocument();
        expect(msqText2).toBeInTheDocument();
        expect(msqAuthor2).toBeInTheDocument();

    });

    it('matches snapshot', () => {
        const messages = [{id: 21, author: 'user', text: 'text'}];
        const renderMessage = render((<MessagesList messageList={messages}/>));
        expect(renderMessage).toMatchSnapshot();
    });

    it('check class input or output messages ', () => {
        const messages = [
            {id: 21, author: 'user', text: 'text'},
            {id: 22, author: 'Bot', text: 'text'}
        ];
        const renderMessage = render((<MessagesList messageList={messages}/>));
        const elementUser = renderMessage.getByText(messages[0].author).parentElement;
        const elementBot = renderMessage.getByText(messages[1].author).parentElement;
        expect(elementUser).toHaveClass('message-in');
        expect(elementBot).toHaveClass('message-out');
    });

    it('check render empty array message ', () => {
        const messages = [];
        const renderMessage = render((<MessagesList messageList={messages}/>));
        const element = renderMessage.getByText('Добавьте сообщение')
        expect(element).toHaveClass('empty-message');
    });
});
