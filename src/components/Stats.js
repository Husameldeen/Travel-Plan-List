export default function Stats({ list }) {
    if (!list.length) {
        return (
            <footer className='stats'>
                <em>
                    Start adding some items to your packing list
                </em>
            </footer>
        );
    }

    const numItems = list.length;
    const packedItems = list.filter(item => item.packed).length;
    const packedPerc = Math.floor((packedItems / numItems) * 100);

    return (
        <footer className='stats'>
            <em>
                {packedPerc === 100 ? "You packed everything, Ready to go!" : `You have ${numItems} items on your list, and you already packed ${packedItems} (${packedPerc}%)`}
            </em>
        </footer>
    );
}
