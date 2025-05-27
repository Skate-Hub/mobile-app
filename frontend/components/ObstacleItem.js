// frontend/components/ObstacleItem.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet as ItemStyleSheet } from 'react-native'; // Renomeei StyleSheet para ItemStyleSheet para evitar conflito se você importar o styles global
import styles, { colors } from '../styles/HomeStyles'; // Importando os estilos globais

// --- Importe seus componentes SVG diretamente ---
// Substitua pelos seus caminhos e nomes corretos
import BoxIcon from '../assets/icons/box.svg';
import StreetIcon from '../assets/icons/Street.svg'; // Note o 'S' maiúsculo no nome do arquivo
import RampIcon from '../assets/icons/ramp.svg';
import ArrowRightIcon from '../assets/icons/ArrowRight.svg';
// Para o ícone padrão, você pode criar um SVG ou usar um PNG
import DefaultObstacleIcon from '../assets/icons/default_obstacle.svg'; // Crie este ou use um PNG

// Mapeamento de chaves de ícone para componentes.
// A CHAVE (ex: 'box', 'street') deve corresponder ao que o backend envia no campo 'iconKey' do obstáculo.
const iconRenderers = {
  // Chave do backend : Componente ou função que renderiza o ícone
  'box': (props) => <BoxIcon width={24} height={24} fill={colors.textPrimary} {...props} />,
  'street': (props) => <StreetIcon width={24} height={24} fill={colors.textPrimary} {...props} />,
  'rampa': (props) => <RampIcon width={24} height={24} fill={colors.textPrimary} {...props} />,
  // Para o PNG, usamos o componente Image
  'corrimao': (props) => <Image source={require('../assets/icons/corrimao.png')} style={[itemLocalStyles.obstacleIcon, props.style]} />,
  'default': (props) => <DefaultObstacleIcon width={24} height={24} fill={colors.textSecondary} {...props} />, // Ícone padrão
};

const ObstacleItem = ({ item, onPress }) => {
  // item.iconKey virá do backend (ex: "box", "street", "corrimao", "rampa")
  // Se o backend enviar "corrimao", o mapeamento acima usará a Image.
  const renderIcon = iconRenderers[item.iconKey] || iconRenderers.default;

  return (
    <TouchableOpacity style={itemLocalStyles.card} onPress={onPress}>
      <View style={itemLocalStyles.iconContainer}>
        {renderIcon ? renderIcon({ style: itemLocalStyles.obstacleIconProps }) : null}
      </View>
      <Text style={itemLocalStyles.cardText}>{item.nome}</Text>
      <ArrowRightIcon width={18} height={18} fill={colors.textPrimary} style={itemLocalStyles.arrowIconProps} />
    </TouchableOpacity>
  );
};

// Estilos específicos para ObstacleItem, podem ser movidos para HomeStyles.js ou mantidos aqui
const itemLocalStyles = ItemStyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 }, // Ajustei a sombra para ser mais sutil como no seu exemplo
    shadowOpacity: 0.1, // Ajustei a opacidade
    shadowRadius: 3,
    elevation: 3, // Ajustei a elevação
  },
  iconContainer: {
    marginRight: 15,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  obstacleIconProps: { // Estilo aplicado aos ícones SVG/PNG dentro do container
    width: 24,
    height: 24,
  },
  cardText: {
    flex: 1,
    fontFamily: 'Roboto_Mono_400Regular', // Use o nome exato da fonte "medium" carregada
    fontSize: 16,
    color: colors.textPrimary,
  },
  arrowIconProps: { // Estilo para o ícone de seta, se necessário
    // marginLeft: 'auto', // Se quiser empurrar para a direita
  },
});

export default ObstacleItem;