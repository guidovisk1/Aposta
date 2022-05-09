import React from 'react';

import toolIcon from '../../../../assets/icons/tool-icon-2.svg';

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
  cod_ferramenta: string;
  descricao: string;
  imagem?: string;
}
interface ListItemProps {
  list: Item[];
  onClicked: (tool: Item) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onClicked }) => {
  return (
    <Container>
      {list.length &&
        list.map(tool => (
          <Item key={tool.cod_ferramenta} onClick={() => onClicked(tool)}>
            <LogoWrapper>
              <RoundedOutline>
                <img src={toolIcon} />
              </RoundedOutline>
            </LogoWrapper>

            <EquipmentInfoWrapper>
              <NameWrapper>
                <Name>{tool.descricao}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <Sector>COD: {tool.cod_ferramenta}</Sector>
                <Sector>FOTO: {tool.imagem ? 'SIM' : 'NÃO'}</Sector>
              </DownInfoWrapper>
            </EquipmentInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
