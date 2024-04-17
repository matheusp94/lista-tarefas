import React from "react";
import { FlatList, Text, Box, IconButton, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

// Definindo as propriedades que o componente TarefaItem irá receber
interface TarefaItemProps {
    id: number;
    titulo: string;
}

// Componente TarefaItem que renderiza cada item da lista de tarefas
const TarefaItem: React.FC<TarefaItemProps> = ({ id, titulo }) => {
    // Obtendo as funções editarTarefa e excluirTarefa do contexto global
    const { editarTarefa, excluirTarefa } = useEstadoGlobal();

    // Definindo os estados locais para controlar a edição do título da tarefa
    const [editando, setEditando] = React.useState(false);
    const [novoTitulo, setNovoTitulo] = React.useState(titulo);

    // Função para alternar entre o modo de edição e visualização do título da tarefa
    const handleEditar = () => {
        if (editando) {
            editarTarefa(id, novoTitulo); // Chamando a função editarTarefa com o novo título
        }
        setEditando(!editando); // Alternando o estado de edição
    };

    return (
        <Box
            flexDirection="row" // Ajustando o layout para linha
            justifyContent="space-between" // Alinhando os itens à direita
            alignItems="center" // Alinhando os itens verticalmente
            bg="gray.200" // Definindo a cor de fundo como cinza
            p={4} // Adicionando um padding interno de 4
            my={2} // Adicionando uma margem vertical de 2
            mx={2} // Adicionando uma margem horizontal de 2
        >
            {editando ? ( // Verificando se está no modo de edição
                <Input
                    flex={3} // Ajustando o tamanho do input
                    value={novoTitulo} // Definindo o valor do input como o novo título
                    onChangeText={setNovoTitulo} // Atualizando o estado novoTitulo ao digitar
                />
            ) : (
                <Text flex={3}>{titulo}</Text> // Exibindo o título da tarefa à esquerda
            )}
            <IconButton
                icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={14} color="#402291" />} // Ícone muda dependendo do modo de edição
                colorScheme="light"
                onPress={handleEditar} // Chamando a função handleEditar ao clicar no botão
                style={{ borderRadius: 50, backgroundColor: 'gold', marginLeft: 4 }} // Estilizando o botão editar
            />
            <IconButton
                icon={<Ionicons name="trash" size={14} color="#402291" />}
                colorScheme="light"
                onPress={() => excluirTarefa(id)} // Chamando a função excluirTarefa com o id da tarefa ao clicar no botão
                style={{ borderRadius: 50, backgroundColor: 'red', marginLeft: 4 }} // Estilizando o botão excluir
            />
        </Box>
    );
};

// Componente ListaTarefas que exibe a lista de tarefas utilizando um componente FlatList
const ListaTarefas: React.FC = () => {
    const { tarefas } = useEstadoGlobal(); // Obtendo a lista de tarefas do contexto global

    return (
        <FlatList
            data={tarefas} // Definindo os dados da lista como a lista de tarefas obtida do contexto global
            renderItem={({ item }) => <TarefaItem id={item.id} titulo={item.titulo} />} // Renderizando cada item da lista utilizando o componente TarefaItem
            keyExtractor={(item) => item.id.toString()} // Extraindo chaves únicas para cada item da lista
            contentContainerStyle={{ flexGrow: 1 }} // Definindo o estilo para que a lista ocupe todo o espaço disponível
        />
    );
};

export default ListaTarefas;