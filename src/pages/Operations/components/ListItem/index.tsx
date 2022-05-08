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
  cod_operacao: string;
  descricao: string;
  instrucao: string;
  imagem: string;
  pdf?: string;
  fbx?: string;
  video?: string;
  ocr: boolean;
  ocrParametro: string;
  qrcode: boolean;
  qrcodeParametro: string;
  medicao: boolean;
  medicaoParametro: string;
  status: number;
}
interface ListItemProps {
  list: Item[];
  onClicked: (operation: Item) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onClicked }) => {
  return (
    <Container>
      {list.length &&
        list.map(operation => (
          <Item
            key={operation.cod_operacao}
            onClick={() => onClicked(operation)}
          >
            <LogoWrapper>
              <RoundedOutline>
                <img src={trainingIcon} />
              </RoundedOutline>
            </LogoWrapper>

            <EquipmentInfoWrapper>
              <NameWrapper>
                <Name>{operation.descricao}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <Sector>COD: {operation.cod_operacao}</Sector>
              </DownInfoWrapper>
            </EquipmentInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
