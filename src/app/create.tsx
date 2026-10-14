import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBusinesses } from '../businesses';
import { colors } from '../theme';

export default function Create() {
  const { addBusiness } = useBusinesses();
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [description,setDescription] = useState('');
  const [saving,setSaving] = useState(false);
  const valid = !!(name.trim() && category.trim() && description.trim());
  async function save() {
    if (!valid || saving) return;
    setSaving(true);
    try { await addBusiness({name:name.trim(),category:category.trim(),description:description.trim()}); router.back(); }
    catch { Alert.alert('Could not save', 'Please try again.'); }
    finally { setSaving(false); }
  }
  return <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <View style={styles.eyebrowRow}><View style={styles.dot}/><Text style={styles.eyebrow}>JOIN THE DIRECTORY</Text></View>
      <Text style={styles.heading}>Put your business{'\n'}on the map<Text style={styles.period}>.</Text></Text>
      <Text style={styles.subtitle}>Three little details and you're in.</Text>
      <View style={styles.field}><Text style={styles.label}>Business name</Text><TextInput accessibilityLabel="Business name" value={name} onChangeText={setName} placeholder="e.g. Maple Street Bakery" placeholderTextColor={colors.muted} style={styles.input} maxLength={100}/></View>
      <View style={styles.field}><Text style={styles.label}>Category</Text><TextInput accessibilityLabel="Category" value={category} onChangeText={setCategory} placeholder="e.g. Food & Drink" placeholderTextColor={colors.muted} style={styles.input} maxLength={60}/></View>
      <View style={styles.field}><Text style={styles.label}>Short description</Text><TextInput accessibilityLabel="Short description" value={description} onChangeText={setDescription} placeholder="What makes your business special?" placeholderTextColor={colors.muted} multiline textAlignVertical="top" style={[styles.input,styles.multiline]} maxLength={500}/></View>
      <Pressable accessibilityRole="button" disabled={!valid || saving} style={[styles.button,(!valid || saving) && styles.disabled]} onPress={save}><Text style={styles.buttonText}>{saving ? 'Saving…' : 'Create listing'}</Text><Ionicons name="arrow-forward" size={20} color="#20172D"/></Pressable>
    </ScrollView>
  </KeyboardAvoidingView>;
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:colors.background},content:{padding:24,paddingTop:30,paddingBottom:48},
  eyebrowRow:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:16},dot:{width:8,height:8,borderRadius:4,backgroundColor:'#BFA8FF'},eyebrow:{fontSize:11,fontWeight:'800',letterSpacing:2,color:colors.muted},
  heading:{fontSize:35,lineHeight:41,fontWeight:'800',letterSpacing:-1.3,color:colors.ink},period:{color:'#BFA8FF'},subtitle:{color:colors.muted,fontSize:15,marginTop:13,marginBottom:20},
  field:{marginTop:21},label:{fontSize:14,fontWeight:'700',color:colors.ink,marginBottom:10},
  input:{borderRadius:16,borderWidth:1,borderColor:colors.border,backgroundColor:colors.surface,padding:16,fontSize:15,color:colors.ink},multiline:{height:130},
  button:{backgroundColor:colors.primary,borderRadius:18,flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:18,marginTop:30},disabled:{opacity:0.45},buttonText:{color:'#20172D',fontSize:16,fontWeight:'700'}
});
