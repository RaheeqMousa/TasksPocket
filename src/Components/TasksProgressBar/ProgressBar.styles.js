import styled from 'styled-components';

export const Progress = styled.div`
  width: 200px;
  background: beige;
  border-radius: 20px;
`;

export const Completed = styled.div`
  height: 20px;
  background: green;
  width: ${props => props.width || '0%'};
  border-radius: 20px;
  transition: width 0.3s ease-in-out;
`;
