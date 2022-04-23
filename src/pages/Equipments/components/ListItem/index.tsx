import React from 'react';

import equipmentIcons from '../../../../assets/icons/equipments-icon-2.svg';

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
  cod_equipamento: string;
  descricao: string;
}
interface ListItemProps {
  list: Item[];
  onClicked: (user: Item) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onClicked }) => {
  return (
    <Container>
      {list.length &&
        list.map(equipment => (
          <Item
            key={equipment.cod_equipamento}
            onClick={() => onClicked(equipment)}
          >
            <LogoWrapper>
              <RoundedOutline>
                <img src={equipmentIcons} />
              </RoundedOutline>
            </LogoWrapper>

            <EquipmentInfoWrapper>
              <NameWrapper>
                <Name>{equipment.descricao}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <Sector>COD: {equipment.cod_equipamento}</Sector>
                <Sector>TIPO: </Sector>
              </DownInfoWrapper>
            </EquipmentInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
