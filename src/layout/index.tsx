import CharacterList from '../features/characterList/CharacterList';

const Layout: React.FC<any> = (props) => {

    return (
        <div className='flex h-screen'>
            <CharacterList />
            <>
                {props.children}
            </>
        </div>
    );
}

export default Layout;