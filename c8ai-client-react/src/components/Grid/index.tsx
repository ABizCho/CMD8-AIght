import styled from "styled-components";

// const Card = (): JSX.Element => {
//   return <div></div>;
// };

const GridItemWrap = styled.div`
  max-width: 100%;
  max-height: 10%
  width: 100%;
  height: 225px;
  flex: 1 1 auto;
  border-radius: 10px;
  box-shadow: var(--shadow-modal);
`;

const GridBox = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 1rem;
  place-items: center;

  justify-content: flex-start;
`;
export { GridItemWrap, GridBox };
