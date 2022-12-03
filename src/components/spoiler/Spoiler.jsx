import React from 'react';

import { SpoilerWrapper } from "./styled"

export default function Spoiler({ isOpenSpoiler }) {
    return (
        <SpoilerWrapper isOpenSpoiler={isOpenSpoiler} />
    )
}
