import React from 'react';

import helmetIcon from '../../../../assets/icons/helmet-icon-2.svg';

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
  cod_epi: string;
  descricao: string;
  imagem?: string;
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
        list.map(epi => (
          <Item key={epi.cod_epi} onClick={() => onClicked(epi)}>
            <LogoWrapper>
              <RoundedOutline>
                <img src={helmetIcon} />
              </RoundedOutline>
            </LogoWrapper>

            <EquipmentInfoWrapper>
              <NameWrapper>
                <Name>{epi.descricao}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <Sector>COD: {epi.cod_epi}</Sector>
                <Sector>FBX: {epi.imagem ? 'SIM' : 'NÃO'}</Sector>
              </DownInfoWrapper>
            </EquipmentInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
