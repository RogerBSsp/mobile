import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './screens/homeScreen';
import DetalheTintoScreen from './screens/detalheTintoScreen';
import DetalheEspumanteScreen from './screens/detalheEspumanteScreen';
import DetalheRoseScreen from './screens/detalheRoseScreen';
import DetalheBrancoScreen from './screens/detalheBrancoScreen';
import AvaliacoesScreen from './screens/avaliacoesScreen';
import Perfil from './screens/perfilScreen';
import Sobre from './screens/sobreNos';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('Home');
  const [produtoDetalhe, setProdutoDetalhe] = useState(null);

  const navegarParaAvaliacoes = () => {
    setTelaAtual('Avaliacoes');
  };

  const renderizaTela = () => {
    switch (telaAtual) {
      case 'Tinto':
        return (
          <DetalheTintoScreen
            voltar={() => setTelaAtual('Home')}
            navegarParaAvaliacoes={navegarParaAvaliacoes}
          />
        );
      case 'Espumante':
        return (
          <DetalheEspumanteScreen
            voltar={() => setTelaAtual('Home')}
            navegarParaAvaliacoes={navegarParaAvaliacoes}
          />
        );
      case 'Rose':
        return (
          <DetalheRoseScreen
            voltar={() => setTelaAtual('Home')}
            navegarParaAvaliacoes={navegarParaAvaliacoes}
          />
        );
      case 'Branco':
        return (
          <DetalheBrancoScreen
            voltar={() => setTelaAtual('Home')}
            navegarParaAvaliacoes={navegarParaAvaliacoes}
          />
        );
        case 'Perfil':
        return (
          <Perfil
            voltar={() => setTelaAtual('Home')}
            navegarParaAvaliacoes={navegarParaAvaliacoes}
          />
        );
        case 'Sobre':
        return (
          <Sobre
            voltar={() => setTelaAtual('Home')}
            navegarParaAvaliacoes={navegarParaAvaliacoes}
          />
        );
      case 'Avaliacoes':
        return <AvaliacoesScreen voltar={() => setTelaAtual(produtoDetalhe || 'Tinto')} />;
      default:
        return <HomeScreen irParaDetalhe={(produto) => {
          setProdutoDetalhe(produto);
          setTelaAtual(produto); 
        }} />;
    }
  };

  return <SafeAreaView style={{ flex: 1 }}>{renderizaTela()}</SafeAreaView>;
}