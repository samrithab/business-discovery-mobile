import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBusinesses, type Business } from '../businesses';
import { colors } from '../theme';

export default function Directory() {
  const { businesses, loading } = useBusinesses();
  const [search, setSearch] = useState('');
  const results = useMemo(() => businesses.filter(b => b.name.toLowerCase().includes(search.trim().toLowerCase())), [businesses, search]);

  function renderBusiness({ item }: { item: Business }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.iconTile}><Ionicons name="storefront-outline" size={21} color={colors.ink} /></View>
          <View style={styles.cardInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={loading ? [] : results}
        keyExtractor={item => item.id}
        renderItem={renderBusiness}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.eyebrowRow}><View style={styles.dot} /><Text style={styles.eyebrow}>AROUND THE CORNER</Text></View>
            <Text style={styles.heading}>Good things{'\n'}close to home<Text style={styles.period}>.</Text></Text>
            <Text style={styles.subtitle}>Meet your next favourite local spot.</Text>
            <Pressable accessibilityRole="button" style={styles.addButton} onPress={() => router.push('/create')}>
              <Text style={styles.addButtonText}>Add your business</Text>
              <View style={styles.addIcon}><Ionicons name="add" size={19} color={colors.ink}/></View>
            </Pressable>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={21} color={colors.muted}/>
              <TextInput accessibilityLabel="Search by business name" placeholder="Search businesses" placeholderTextColor={colors.muted} value={search} onChangeText={setSearch} style={styles.searchInput} autoCorrect={false} returnKeyType="search" />
              {search.length > 0 && <Pressable accessibilityLabel="Clear search" accessibilityRole="button" onPress={() => setSearch('')}><Ionicons name="close-circle" size={19} color={colors.muted}/></Pressable>}
            </View>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{search.trim() ? 'Search results' : 'Explore businesses'}</Text><Text style={styles.count}>{loading ? '...' : `${results.length} ${results.length === 1 ? 'listing' : 'listings'}`}</Text></View>
          </View>
        }
        ListEmptyComponent={loading ? <ActivityIndicator style={styles.loader} color={colors.ink}/> : (
          <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name={search.trim() ? 'search-outline' : 'storefront-outline'} size={25} color={colors.ink}/></View><Text style={styles.emptyTitle}>{search.trim() ? 'No matches just yet' : 'Something good starts here'}</Text><Text style={styles.emptyBody}>{search.trim() ? 'Try searching for a different name.' : 'Be the first to add a local business.'}</Text></View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex:1, backgroundColor:colors.background},
  content: {paddingHorizontal:24, paddingTop:30, paddingBottom:48, flexGrow:1},
  eyebrowRow: {flexDirection:'row',alignItems:'center',gap:8,marginBottom:16},
  dot: {width:8,height:8,borderRadius:4,backgroundColor:'#BFA8FF'},
  eyebrow: {fontSize:11,fontWeight:'800',letterSpacing:2,color:colors.muted},
  heading: {fontSize:39,lineHeight:44,fontWeight:'800',letterSpacing:-1.8,color:colors.ink},
  period: {color:'#BFA8FF'},
  subtitle: {fontSize:15,lineHeight:22,color:colors.muted,marginTop:13,marginBottom:26},
  addButton: {backgroundColor:colors.primary,borderRadius:20,paddingVertical:13,paddingLeft:20,paddingRight:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:24},
  addButtonText: {fontSize:16,fontWeight:'700',color:'#20172D'},
  addIcon: {height:37,width:37,borderRadius:13,backgroundColor:'#9d84d7',alignItems:'center',justifyContent:'center'},
  searchBox: {backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:17,flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:17,minHeight:56},
  searchInput: {flex:1,fontSize:15,color:colors.ink,paddingVertical:13},
  sectionHeader: {flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:32,marginBottom:14},
  sectionTitle: {fontSize:20,fontWeight:'800',letterSpacing:-0.5,color:colors.ink},
  count: {fontSize:12,color:colors.muted},
  card: {backgroundColor:colors.surface,borderRadius:20,borderWidth:1,borderColor:colors.border,padding:18,marginBottom:12},
  cardTop: {flexDirection:'row',alignItems:'center',gap:13},
  iconTile: {width:46,height:46,borderRadius:15,backgroundColor:colors.soft,alignItems:'center',justifyContent:'center'},
  cardInfo: {flex:1},
  name: {fontSize:17,fontWeight:'800',letterSpacing:-0.3,color:colors.ink},
  category: {fontSize:12,fontWeight:'600',color:'#C7B3FF',marginTop:4},
  description: {fontSize:14,lineHeight:21,color:colors.muted,marginTop:14},
  empty: {alignItems:'center',paddingVertical:50,paddingHorizontal:16},
  emptyIcon: {width:58,height:58,borderRadius:20,backgroundColor:'#E5DAFF',alignItems:'center',justifyContent:'center',marginBottom:16},
  emptyTitle: {fontSize:18,fontWeight:'800',color:colors.ink,textAlign:'center'},
  emptyBody: {fontSize:14,color:colors.muted,marginTop:8,textAlign:'center'},
  loader: {marginTop:30},
});
