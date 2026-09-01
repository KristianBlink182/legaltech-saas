import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'cases' | 'calendar' | 'ai'>('cases');
  const [selectedCase, setSelectedCase] = useState<any | null>(null);

  const cases = [
    {
      id: '1',
      expediente_numero: '00009-2026-0-0101-JR-CI-01',
      juzgado: 'Juzgado Mixto de Jumbilla - Bongará (Amazonas)',
      materia: 'CIVIL - Prescripción Adquisitiva de Dominio',
      plazo: '3 días hábiles',
      estado: 'ACTIVO',
      ultimo_mov: 'Resolución N° 01 (Auto Admisorio)'
    },
    {
      id: '2',
      expediente_numero: '00420-2024-0-1801-JR-CI-05',
      juzgado: '5° Juzgado Especializado en lo Civil - Lima',
      materia: 'CIVIL - Obligación de Dar Suma de Dinero',
      plazo: '2 días hábiles (Subsanación)',
      estado: 'ACTIVO',
      ultimo_mov: 'Resolución N° 04 (Inadmisible)'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header JUDIBOT */}
      <View style={styles.header}>
        <View>
          <View style={styles.logoRow}>
            <Text style={styles.logo}>JUDIBOT</Text>
            <View style={styles.proTag}><Text style={styles.proText}>PRO</Text></View>
          </View>
          <Text style={styles.subLogo}>Monitoreo Judicial y Fiscal de Perú</Text>
        </View>
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>● CEJ LIVE</Text>
        </View>
      </View>

      {/* Contenido Principal */}
      <View style={styles.mainContent}>
        {!selectedCase ? (
          <FlatList
            data={cases}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card} 
                activeOpacity={0.8}
                onPress={() => setSelectedCase(item)}
              >
                <View style={styles.badgeRow}>
                  <Text style={styles.caseNumber}>{item.expediente_numero}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.estado}</Text>
                  </View>
                </View>

                <Text style={styles.court}>{item.juzgado}</Text>
                <Text style={styles.matter}>{item.materia}</Text>

                <View style={styles.plazoCard}>
                  <Text style={styles.plazoTitle}>⚠️ Plazo Fatal Detectado</Text>
                  <Text style={styles.plazoSub}>Vence en {item.plazo}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <ScrollView style={styles.detailContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedCase(null)}>
              <Text style={styles.backText}>← Volver a expedientes</Text>
            </TouchableOpacity>

            <View style={styles.detailCard}>
              <Text style={styles.detailExp}>{selectedCase.expediente_numero}</Text>
              <Text style={styles.detailJuzgado}>{selectedCase.juzgado}</Text>
              <Text style={styles.detailMateria}>{selectedCase.materia}</Text>
            </View>

            <Text style={styles.sectionTitle}>Línea de Tiempo Procesal (CEJ)</Text>
            
            <View style={styles.resCard}>
              <Text style={styles.resTitle}>Resolución N° 01 (Auto)</Text>
              <Text style={styles.resFecha}>Poder Judicial del Perú</Text>
              <Text style={styles.resActo}>AUTO QUE ADMITE A TRÁMITE</Text>
              <View style={styles.aiBox}>
                <Text style={styles.aiText}>🤖 Análisis IA JUDIBOT: Se admite a trámite la demanda. Se confiere traslado al demandado.</Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Barra de Navegación Inferior Nativa (Bottom Tabs) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => { setSelectedCase(null); setCurrentTab('cases'); }}>
          <Text style={[styles.tabIcon, currentTab === 'cases' && styles.tabActive]}>📂</Text>
          <Text style={[styles.tabText, currentTab === 'cases' && styles.tabActive]}>Expedientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabBtn} onPress={() => setCurrentTab('calendar')}>
          <Text style={[styles.tabIcon, currentTab === 'calendar' && styles.tabActive]}>📅</Text>
          <Text style={[styles.tabText, currentTab === 'calendar' && styles.tabActive]}>Agenda PJ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabBtn} onPress={() => setCurrentTab('ai')}>
          <Text style={[styles.tabIcon, currentTab === 'ai' && styles.tabActive]}>✨</Text>
          <Text style={[styles.tabText, currentTab === 'ai' && styles.tabActive]}>Copiloto IA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090D16' },
  header: { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1E293B', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logo: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 },
  proTag: { backgroundColor: 'rgba(99, 102, 241, 0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)' },
  proText: { color: '#818CF8', fontSize: 10, fontWeight: 'bold' },
  subLogo: { fontSize: 10, color: '#94A3B8', marginTop: 2 },
  liveBadge: { backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' },
  liveText: { color: '#34D399', fontSize: 10, fontWeight: 'bold' },
  mainContent: { flex: 1 },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#131B2E', borderWidth: 1, borderColor: '#1E293B', borderRadius: 18, padding: 16 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  caseNumber: { color: '#818CF8', fontWeight: 'bold', fontSize: 13, fontFamily: 'monospace' },
  badge: { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: '#34D399', fontSize: 9, fontWeight: 'bold' },
  court: { color: '#F8FAFC', fontSize: 13, fontWeight: '600', marginBottom: 2 },
  matter: { color: '#64748B', fontSize: 11, marginBottom: 12 },
  plazoCard: { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.2)', borderRadius: 12, padding: 10 },
  plazoTitle: { color: '#FCD34D', fontSize: 11, fontWeight: 'bold' },
  plazoSub: { color: '#FBBF24', fontSize: 10, marginTop: 2 },
  detailContainer: { padding: 16 },
  backBtn: { marginBottom: 14 },
  backText: { color: '#818CF8', fontSize: 13 },
  detailCard: { backgroundColor: '#131B2E', padding: 16, borderRadius: 18, borderWidth: 1, borderColor: '#1E293B', marginBottom: 20 },
  detailExp: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
  detailJuzgado: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  detailMateria: { color: '#64748B', fontSize: 11, marginTop: 2 },
  sectionTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  resCard: { backgroundColor: '#131B2E', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: '#1E293B', marginBottom: 10 },
  resTitle: { color: '#818CF8', fontSize: 12, fontWeight: 'bold' },
  resFecha: { color: '#64748B', fontSize: 10, marginTop: 2 },
  resActo: { color: '#FFFFFF', fontSize: 12, marginTop: 6, fontWeight: '600' },
  aiBox: { backgroundColor: '#090D16', padding: 10, borderRadius: 10, marginTop: 8, borderWidth: 1, borderColor: '#1E293B' },
  aiText: { color: '#93C5FD', fontSize: 11, lineHeight: 16 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#1E293B', backgroundColor: '#090D16' },
  tabBtn: { alignItems: 'center' },
  tabIcon: { fontSize: 18, color: '#64748B' },
  tabText: { fontSize: 10, color: '#64748B', marginTop: 2 },
  tabActive: { color: '#818CF8', fontWeight: 'bold' }
});