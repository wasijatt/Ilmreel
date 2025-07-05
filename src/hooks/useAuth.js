import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/config/supabase';
import { setUser, setSession, setLoading, setError, clearAuth } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, session, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
      dispatch(setUser(session?.user ?? null));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      dispatch(setUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  const signIn = async (email, password) => {
    try {
      dispatch(setLoading(true));
      console.log('Attempting to sign in with email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase sign in error:', error);
        throw error;
      }
      
      console.log('Sign in successful:', data);
      toast.success('Successfully signed in!');
    } catch (error) {
      console.error('Sign in error details:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        name: error.name
      });
      dispatch(setError(error.message));
      toast.error(error.message || 'Failed to sign in. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signUp = async (email, password) => {
    try {
      dispatch(setLoading(true));
      console.log('Attempting to sign up with email:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Supabase sign up error:', error);
        throw error;
      }
      
      console.log('Sign up successful:', data);
      toast.success('Successfully signed up! Please check your email for verification.');
    } catch (error) {
      console.error('Sign up error details:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        name: error.name
      });
      dispatch(setError(error.message));
      toast.error(error.message || 'Failed to sign up. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signOut = async () => {
    try {
      dispatch(setLoading(true));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      dispatch(clearAuth());
      toast.success('Successfully signed out!');
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    session,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
  };
}; 