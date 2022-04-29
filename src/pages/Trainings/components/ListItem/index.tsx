import React from 'react';

import trainingIcon from '../../../../assets/icons/trainning-icon-2.svg';

import {
  Container,
  Item,
  RoundedOutline,
  LogoWrapper,
  NameWrapper,
  Name,
  UserInfoWrapper as EquipmentInfoWrapper,
  DownInfoWrapper,
  Sector,
} from './styles';

interface Item {
  cod_treinamento: string;
  descricao: string;
  status?: number;
}
interface ListItemProps {
  list: Item[];
  onClicked: (epi: Item) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onClicked }) => {
  return (
    <Container>
      {list.length &&
        list.map(treinamento => (
          <Item
            key={treinamento.cod_treinamento}
            onClick={() => onClicked(treinamento)}
          >
            <LogoWrapper>
              <RoundedOutline>
                <img src={trainingIcon} />
              </RoundedOutline>
            </LogoWrapper>

            <EquipmentInfoWrapper>
              <NameWrapper>
                <Name>{treinamento.descricao}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <Sector>COD: {treinamento.cod_treinamento}</Sector>
              </DownInfoWrapper>
            </EquipmentInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
