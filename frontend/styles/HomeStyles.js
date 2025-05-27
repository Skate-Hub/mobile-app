//frontend/styles/HomeStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const colors = {
  background: '#FFFFFF',
  textPrimary: '#0C0C0D',
  textSecondary: '#555555', // Um cinza para textos menos importantes, ajuste se necessário
  border: '#0C0C0D',
  divider: '#CDCDCD',
  shadow: 'rgba(0, 0, 0, 0.25)',
  selectedItemBackground: 'rgba(5, 5, 5, 0.08)', // #050505 com 8% de opacidade
  fabBackground: '#0C0C0D', // Cor do FAB (botão de adicionar)
  fabColor: '#FFFFFF',    // Cor do ícone '+' no FAB
};

export default StyleSheet.create({
  // --- Estilos Gerais da Tela Home ---
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50, // Ajuste conforme necessário para status bar / notch
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerTitle: {
    fontFamily: 'Roboto_Mono_700Bold', // Use o nome exato que você definiu em useFonts
    fontSize: 24,
    color: colors.textPrimary,
  },
  contentContainer: {
    flexGrow: 1, // Importante para ScrollView preencher a tela mesmo com pouco conteúdo
    padding: 20,
  },
  sectionTitle: { // Para "Obstaculos:"
    fontFamily: 'Roboto_Mono_400Regular', // Assumindo que "medium" é regular ou um peso 400/500
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 15,
    // fontWeight: '500', // Se você tiver um peso "medium" carregado
  },

  // --- Estilos do Estado Vazio ---
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60, // Para dar espaço para o botão "+" e a tab bar
  },
  emptyStateImage: { // Para a ilustração do skatista
    width: 150,
    height: 100, // Ajuste as dimensões conforme o seu SVG/imagem
    marginBottom: 30,
  },
  emptyStateText: {
    fontFamily: 'Roboto_Mono_700Bold', // "Cadastre o seu primeiro obstaculo" é bold
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyStateAddButton: {
    backgroundColor: colors.fabBackground, // Usando a cor do FAB para consistência
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra (iOS e Android)
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  // --- Estilos do Floating Action Button (FAB) ---
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30, // Ajuste se tiver uma tab bar mais alta
    backgroundColor: colors.fabBackground,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIcon: {
    // A cor do ícone SVG será definida no próprio SVG ou via props se for um componente
  },

  // --- Estilos do Indicador de Carregamento e Erro ---
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // --- Estilos da Tab Bar Simulada (REMOVER QUANDO USAR REACT NAVIGATION) ---
  tabBar: {
    flexDirection: 'row',
    height: 65, // Altura um pouco maior para acomodar ícone e texto
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.background, // Fundo branco
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabIcon: {
    width: 24, // Defina o tamanho dos seus ícones SVG/Image
    height: 24,
    marginBottom: 2,
  },
  tabText: {
    fontFamily: 'Roboto_Mono_400Regular', // Assumindo medium para texto da tab
    fontSize: 11,
    color: colors.textSecondary, // Cor para ícones/texto inativos
  },
  tabTextActive: {
    color: colors.textPrimary, // Cor para ícone/texto ativo
  },
});