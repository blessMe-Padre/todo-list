import styled from "styled-components";

export const SpoilerWrapper = styled.div`
transition: min-height 0.3s ease-in ;
background-color:  var(--color-aliceblue);
min-height: ${(p) => (
        p.isOpenSpoiler ? "150px" : "0")};
`