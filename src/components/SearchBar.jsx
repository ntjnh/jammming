import React from 'react'
import Button from './Button'

export default function SearchBar() {
    return (
        <section>
            <form>
                <input type="text" name="song" id="song" placeholder="Enter a song title" />

                <Button
                    style="search"
                    label="Search"
                    type="submit"
                />
            </form>
        </section>
    )
}
