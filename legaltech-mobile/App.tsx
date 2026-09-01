import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Conexión Supabase para Móvil
const supabase = createClient(
  'PEGA_AQUI_TU_URL_DE_SUPABASE',
  'PEGA_AQUI_TU_ANON_KEY_DE_SUPABASE'
);

export default function App() {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    async function getCases() {
      const { data } = await supabase.from('cases').select('*').order('created_at', { ascending: false });
      if (data) setCases(data);
    }
    getCases();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>⚖️ IurisBot Mobile</Text>
        <Text style={styles.subLogo}>Alertas Judiciales en Tiempo Real</Text>
      </View>

      {/* Lista de Casos */}
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={styles.badgeRow}>
              <Text style={styles.caseNumber}>{item.expediente_numero}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>ACTIVO</Text>
              </View>
            </View>

            <Text style={styles.court}>{item.juzgado || 'Juzgado Civil'}</Text>
            <Text style={styles.matter}>{item.materia || 'Civil'} - {item.distrito_judicial}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay expedientes activos</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subLogo: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: '#131B2E',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseNumber: {
    color: '#818CF8',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: 'bold',
  },
  court: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  matter: {
    color: '#64748B',
    fontSize: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
});